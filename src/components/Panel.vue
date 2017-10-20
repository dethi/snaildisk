<template>
  <div>
    <nav class="level">
      <div class="level-left">
        <div class="level-item">
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-primary" :class="{'is-loading': isLoading}" @click="scanAllFolder">
                <span class="icon">
                  <i class="fa fa-bolt"></i>
                </span>
                <span>Analyse</span>
              </button>
            </div>

            <div class="control">
              <button class="button is-danger" :disabled="!isLoading" @click="stop">
                <span class="icon">
                  <i class="fa fa-ban"></i>
                </span>
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="level-right">
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>{{ nbFiles }}</strong> files
          </p>
        </div>
        <div class="level-item">
          <p class="subtitle is-5">
            <strong>{{ nbFolders }}</strong> folders
          </p>
        </div>
      </div>
    </nav>

    <div class="columns has-padding">
      <template v-if="isLoading">
        <div class="column has-text-centered">
          <p class="subtitle">
            <span class="icon">
              <i class="fa fa-cog fa-spin"></i>
            </span>
            <span>{{ loadingMessage }}</span>
          </p>
        </div>
      </template>
      <template v-else>
        <div class="column">
          <table class="table is-narrow is-fullwidth">
            <tbody>
              <tr v-if="cwd" @click="prevCwd">
                <th><i class="fa fa-angle-left"></i></th>
                <td>..</td>
                <td></td>
              </tr>
              <tr v-for="row in limitedRows" @click="changeCwd(row)">
                <th>
                  <i v-if="row.type === 'folder'" class="fa fa-folder"></i>
                  <i v-else class="fa fa-file"></i>
                </th>
                <td>{{ row.name }}</td>
                <td class="has-text-right">{{ row.size | size }} - {{ relativeSize(row.size) }} %</td>
              </tr>
              <tr v-if="rows.length !== limitedRows.length">
                <th></th>
                <td>...smaller objects...</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import API from '../api';
import DB from '../db';

import * as types from '../store/mutation-types';

export default {
  data() {
    return {
      isLoading: true,
      loadingMessage: '',

      cwd: null,
      rows: []
    };
  },
  created() {
    NProgress.configure({
      minimum: 0,
      trickle: false
    });

    this.loadingMessage = 'Waking up the dwarves...';
  },
  mounted() {
    DB.prepareDB().then(() => {
      this.isLoading = false;
      this.cwd = '';

      DB.count().then(counter => {
        if (counter.file) {
          this.$store.commit(types.INC_FILE_COUNTER, counter.file);
        }
        if (counter.folder) {
          this.$store.commit(types.INC_FOLDER_COUNTER, counter.folder);
        }
      });
    });
  },
  computed: {
    ...mapState({
      nbFiles: state => state.counters.files,
      nbFolders: state => state.counters.folders,
      usedSpace: state => state.space.used,

      loadingProgress(state) {
        return state.space.used > 0
          ? state.counters.size / state.space.used
          : 0;
      }
    }),

    cwdSize() {
      return this.cwd === ''
        ? this.usedSpace
        : this.rows.reduce((acc, row) => acc + row.size, 0);
    },

    limitedRows() {
      return this.rows.slice(0, 15);
    }
  },
  watch: {
    loadingProgress(n) {
      if (this.isLoading) {
        NProgress.set(n);
      }
    },
    async cwd(path) {
      this.rows = await DB.list(path);
    }
  },
  methods: {
    changeCwd(row) {
      if (row.type === 'folder') {
        this.cwd = `${row.path}/${row.name}`;
      }
    },
    prevCwd() {
      this.cwd = this.cwd.substring(0, this.cwd.lastIndexOf('/'));
    },
    relativeSize(size) {
      return this.cwdSize > 0 ? Math.round(size / this.cwdSize * 100) : 0;
    },
    start() {
      NProgress.start();
      this.isLoading = true;
    },
    stop() {
      NProgress.done();
      this.isLoading = false;
    },
    async scanAllFolder() {
      this.loadingMessage = 'The dwarves collects the data...';
      this.start();

      let hasMore = true;
      while (hasMore && this.isLoading) {
        const res = await API.listEntries();
        await DB.insertEntries(
          res.entries.filter(e => e['.tag'] !== 'deleted')
        );
        await DB.removeEntries(
          res.entries.filter(e => e['.tag'] === 'deleted')
        );

        hasMore = res.has_more;
        const counters = res.entries.reduce(
          (obj, e) => {
            if (e['.tag'] === 'file') {
              obj.files += 1;
              obj.size += e.size;
            } else if (e['.tag'] === 'folder') {
              obj.folders += 1;
            }

            return obj;
          },
          { files: 0, folders: 0, size: 0 }
        );

        this.$store.commit(types.INC_FILE_COUNTER, counters.files);
        this.$store.commit(types.INC_FOLDER_COUNTER, counters.folders);
        this.$store.commit(types.INC_SIZE_COUNTER, counters.size);
      }

      this.loadingMessage = 'Crunching the numbers...';
      await DB.computeAllSize();

      DB.count().then(counter => {
        if (counter.file) {
          this.$store.commit(types.INC_FILE_COUNTER, counter.file);
        }
        if (counter.folder) {
          this.$store.commit(types.INC_FOLDER_COUNTER, counter.folder);
        }
      });

      this.stop();

      // Force reload
      this.cwd = '.';
      this.cwd = '';
    }
  }
};
</script>

<style scoped>
.has-padding {
  padding: 40px 20px;
}

tr {
  cursor: pointer;
}
</style>
