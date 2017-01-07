import lf from 'lovefield';


const ENTRIES_TABLE = 'entries';

class DB {
  constructor() {
    this.db = null;
    this.loaded = false;
  }

  isReady() {
    return this.loaded;
  }

  static getSchemaBuilder() {
    const schemaBuilder = lf.schema.create('snaildisk', 1);
    schemaBuilder.createTable(ENTRIES_TABLE)
      .addColumn('id', lf.Type.STRING)
      .addColumn('name', lf.Type.STRING)
      .addColumn('path', lf.Type.STRING)
      .addColumn('type', lf.Type.STRING)
      .addColumn('depth', lf.Type.INTEGER)
      .addColumn('size', lf.Type.INTEGER)
      .addPrimaryKey(['id'])
      .addIndex('path_idx', ['path'])
      .addIndex('type_idx', ['type'])
      .addIndex('depth_idx', ['depth'], false, lf.Order.DESC);

    return schemaBuilder;
  }

  async prepareDB() {
    if (this.isReady()) {
      return;
    }

    this.db = await DB.getSchemaBuilder().connect();
    this.entriesT = this.db.getSchema().table(ENTRIES_TABLE);

    this.computeSizeQ = this.db.select(lf.fn.sum(this.entriesT.size))
      .from(this.entriesT)
      .where(this.entriesT.path.eq(lf.bind(0)));

    this.countQ = this.db.select(this.entriesT.type, lf.fn.count(this.entriesT.type))
      .from(this.entriesT)
      .groupBy(this.entriesT.type);

    this.loaded = true;
  }

  insertEntries(entries) {
    const rows = entries.map((e) => {
      const path = e.path_lower.substring(0, e.path_lower.lastIndexOf('/'));
      return this.entriesT.createRow({
        id: e.id,
        name: e.name.toLowerCase(),
        path,
        type: e['.tag'],
        depth: path.split('/').length,
        size: e.size || 0,
      });
    });

    const query = this.db.insertOrReplace().into(this.entriesT).values(rows);
    return query.exec();
  }

  async computeAllSize() {
    // Reset all folders size
    await this.db.update(this.entriesT)
      .set(this.entriesT.size, 0)
      .where(lf.op.and(
        this.entriesT.type.eq('folder'),
        this.entriesT.size.neq(0),
      ));

    const rows = await this.db
      .select(this.entriesT.id, this.entriesT.path, this.entriesT.name, this.entriesT.depth)
      .from(this.entriesT)
      .where(this.entriesT.type.eq('folder'))
      .orderBy(this.entriesT.depth, lf.Order.DESC)
      .exec();

    const updateQ = this.db.update(this.entriesT)
      .set(this.entriesT.size, lf.bind(0))
      .where(this.entriesT.id.eq(lf.bind(1)));

    const reducer = (f, row) =>
      f.then(() => this.computeSize(`${row.path}/${row.name}`))
       .then(size => updateQ.bind([size || 0, row.id]).exec());

    return rows.reduce(reducer, Promise.resolve(true));
  }

  async computeSize(path) {
    const res = await this.computeSizeQ.bind([path]).exec();
    return res[0]['SUM(size)'];
  }
}

export default new DB();
