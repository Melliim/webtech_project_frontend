<template>
  <div class="container py-4">
    <!-- Header -->
    <div class="d-flex align-items-start justify-content-between gap-3 flex-wrap mb-3">
      <!-- Left: Title + meta -->
      <div>
        <h2 class="mb-1">
          Items
          <small class="text-muted" v-if="category">
            — {{ category.name }}
          </small>
        </h2>

        <div v-if="category" class="text-muted">
          <span
              class="badge me-2"
              :class="category.activeStatus ? 'bg-success' : 'bg-secondary'"
          >
            {{ category.activeStatus ? 'Active' : 'Inactive' }}
          </span>
          <span v-if="category.description">{{ category.description }}</span>
        </div>

        <div v-else class="text-muted">
          Category #{{ categoryId }}
        </div>
      </div>

      <!-- Middle: Add button (centered) -->
      <div class="flex-grow-1 d-flex justify-content-center">
        <button class="btn btn-primary" type="button" @click="openCreate('NOTSET')">
          <i class="bi bi-plus-lg"></i>
          Add Item
        </button>
      </div>

      <!-- Right: actions -->
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary" type="button" @click="goBack">
          <i class="bi bi-arrow-left"></i>
          Back to Categories
        </button>

        <button
            class="btn btn-outline-primary"
            type="button"
            :disabled="loadingItems"
            @click="loadItems"
        >
          <i class="bi bi-arrow-clockwise"></i>
          Refresh
        </button>
      </div>
    </div>

    <!-- Alerts -->
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-if="loadingCategory || loadingItems" class="alert alert-info" role="alert">
      Loading…
    </div>

    <!-- Columns -->
    <div class="row g-3" v-if="!loadingItems">
      <div class="col-12 col-lg-3" v-for="col in columns" :key="col.storage">
        <div class="card h-100 shadow-sm">
          <div class="card-header d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center gap-2">
              <span class="fw-semibold">{{ col.title }}</span>
              <span class="badge bg-light text-dark">
                {{ grouped[col.storage].length }}
              </span>
            </div>
          </div>

          <div class="card-body p-0">
            <ul class="list-group list-group-flush" v-if="grouped[col.storage].length">
              <li
                  class="list-group-item d-flex align-items-start justify-content-between gap-3"
                  v-for="item in grouped[col.storage]"
                  :key="item.id"
              >
                <div class="flex-grow-1">
                  <div class="d-flex align-items-center gap-2">
                    <div class="fw-semibold">{{ item.name }}</div>
                    <span class="badge" :class="badgeClass(item.storage)">
                      {{ prettyStorage(item.storage) }}
                    </span>
                  </div>
                  <div class="text-muted small" v-if="item.description">
                    {{ item.description }}
                  </div>
                </div>

                <div class="d-flex align-items-center gap-2">
                  <button
                      class="btn btn-sm btn-outline-primary"
                      type="button"
                      @click="openEdit(item)"
                      title="Edit"
                  >
                    <i class="bi bi-pencil-fill"></i>
                  </button>

                  <button
                      class="btn btn-sm btn-outline-danger"
                      type="button"
                      :disabled="deletingId === item.id"
                      @click="deleteItem(item)"
                      title="Delete"
                  >
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </div>
              </li>
            </ul>

            <div class="p-3 text-muted" v-else>
              No items in this group yet.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal (Bootstrap 5, no jQuery) -->
    <div
        class="modal fade"
        id="itemModal"
        tabindex="-1"
        aria-labelledby="itemModalLabel"
        aria-hidden="true"
        ref="itemModalEl"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <form @submit.prevent="saveItem">
            <div class="modal-header">
              <h5 class="modal-title" id="itemModalLabel">
                {{ isEditing ? 'Edit Item' : 'Add Item' }}
              </h5>
              <button type="button" class="btn-close" aria-label="Close" @click="hideModal"></button>
            </div>

            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label" for="itemName">Name</label>
                <input
                    id="itemName"
                    class="form-control"
                    type="text"
                    v-model.trim="form.name"
                    required
                    maxlength="120"
                />
              </div>

              <div class="mb-3">
                <label class="form-label" for="itemDescription">Description</label>
                <input
                    id="itemDescription"
                    class="form-control"
                    type="text"
                    v-model.trim="form.description"
                    maxlength="500"
                />
              </div>

              <div class="mb-3">
                <label class="form-label" for="itemStorage">Storage</label>
                <select id="itemStorage" class="form-select" v-model="form.storage" required>
                  <option value="NOTSET">NOTSET</option>
                  <option value="NONE">NONE</option>
                  <option value="LOW">LOW</option>
                  <option value="STOCKED">STOCKED</option>
                </select>
              </div>

              <div v-if="modalError" class="alert alert-danger mb-0" role="alert">
                {{ modalError }}
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" @click="hideModal">
                Cancel
              </button>
              <button class="btn btn-primary" type="submit" :disabled="saving">
                <span
                    v-if="saving"
                    class="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                ></span>
                {{ isEditing ? 'Save changes' : 'Create item' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- /Modal -->
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  name: 'Items',
  data() {
    return {
      apiBaseUrl: (process.env.VUE_APP_API_BASE_URL || 'http://localhost:8080').replace(/\/$/, ''),
      categoryId: null,

      category: null,
      items: [],

      loadingCategory: false,
      loadingItems: false,
      error: '',

      modal: null,
      isEditing: false,
      saving: false,
      deletingId: null,
      modalError: '',

      form: {
        id: null,
        name: '',
        description: '',
        storage: 'NOTSET'
      },

      // Requested order: NOTSET -> NONE -> LOW -> STOCKED
      columns: [
        { storage: 'NOTSET', title: 'Not Set' },
        { storage: 'NONE', title: 'No Quantity' },
        { storage: 'LOW', title: 'Low Quantity' },
        { storage: 'STOCKED', title: 'Stocked' }
      ]
    };
  },
  computed: {
    grouped() {
      const buckets = { NOTSET: [], NONE: [], LOW: [], STOCKED: [] };

      for (const item of this.items) {
        const key = (item?.storage || 'NOTSET').toUpperCase();
        if (!buckets[key]) buckets[key] = [];
        buckets[key].push(item);
      }

      // Stable sort (optional, but keeps the UI nice)
      for (const key of Object.keys(buckets)) {
        buckets[key].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      }

      return buckets;
    }
  },
  watch: {
    '$route.params.categoryId': {
      immediate: true,
      handler() {
        const id = Number(this.$route.params.categoryId);
        this.categoryId = Number.isFinite(id) ? id : null;

        this.category = null;
        this.items = [];
        this.error = '';

        if (!this.categoryId) {
          this.error = 'Invalid categoryId in route.';
          return;
        }

        this.loadAll();
      }
    }
  },
  mounted() {
    const el = this.$refs.itemModalEl;
    if (el) this.modal = new Modal(el, { backdrop: 'static' });
  },
  methods: {
    goBack() {
      this.$router.push('/categories');
    },

    async loadAll() {
      await Promise.allSettled([this.loadCategory(), this.loadItems()]);
    },

    async loadCategory() {
      this.loadingCategory = true;
      try {
        const res = await fetch(`${this.apiBaseUrl}/api/v1/categories/${this.categoryId}`);
        if (!res.ok) {
          this.category = null;
          return;
        }
        this.category = await res.json();
      } catch {
        this.category = null;
      } finally {
        this.loadingCategory = false;
      }
    },

    async loadItems() {
      this.loadingItems = true;
      this.error = '';
      try {
        const res = await fetch(`${this.apiBaseUrl}/api/v1/items`);
        if (!res.ok) throw new Error(`Failed to fetch items (HTTP ${res.status})`);

        const allItems = await res.json();

        // Filter items to this category by item.category.id
        this.items = (Array.isArray(allItems) ? allItems : []).filter((it) => {
          const cid = it?.category?.id;
          return Number(cid) === Number(this.categoryId);
        });
      } catch (e) {
        this.error = e?.message || 'Failed to load items.';
      } finally {
        this.loadingItems = false;
      }
    },

    openCreate(defaultStorage = 'NOTSET') {
      this.isEditing = false;
      this.modalError = '';
      this.form = {
        id: null,
        name: '',
        description: '',
        storage: (defaultStorage || 'NOTSET').toUpperCase()
      };
      this.modal?.show();
    },

    openEdit(item) {
      this.isEditing = true;
      this.modalError = '';
      this.form = {
        id: item.id,
        name: item.name || '',
        description: item.description || '',
        storage: (item.storage || 'NOTSET').toUpperCase()
      };
      this.modal?.show();
    },

    hideModal() {
      this.modal?.hide();
    },

    async saveItem() {
      this.saving = true;
      this.modalError = '';

      // Backend expects: { name, description, storage, shelfId }
      const payload = {
        name: this.form.name,
        description: this.form.description,
        storage: (this.form.storage || 'NOTSET').toUpperCase(),
        shelfId: this.categoryId
      };

      try {
        if (this.isEditing && this.form.id != null) {
          const res = await fetch(`${this.apiBaseUrl}/api/v1/items/${this.form.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (!res.ok) throw new Error(`Update failed (HTTP ${res.status})`);

          const updated = await res.json();
          const idx = this.items.findIndex((x) => x.id === updated.id);
          if (idx !== -1) this.items.splice(idx, 1, updated);
          else await this.loadItems();
        } else {
          const res = await fetch(`${this.apiBaseUrl}/api/v1/items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (!res.ok) throw new Error(`Create failed (HTTP ${res.status})`);

          // POST returns 201 with no body in your backend -> refresh list
          await this.loadItems();
        }

        this.hideModal();
      } catch (e) {
        this.modalError = e?.message || 'Save failed.';
      } finally {
        this.saving = false;
      }
    },

    async deleteItem(item) {
      const ok = window.confirm(`Delete "${item.name}"?`);
      if (!ok) return;

      this.deletingId = item.id;
      try {
        const res = await fetch(`${this.apiBaseUrl}/api/v1/items/${item.id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(`Delete failed (HTTP ${res.status})`);
        this.items = this.items.filter((x) => x.id !== item.id);
      } catch (e) {
        this.error = e?.message || 'Delete failed.';
      } finally {
        this.deletingId = null;
      }
    },

    prettyStorage(storage) {
      return (storage || 'NOTSET').toUpperCase();
    },

    badgeClass(storage) {
      const s = (storage || 'NOTSET').toUpperCase();
      if (s === 'LOW') return 'bg-warning text-dark';
      if (s === 'NONE') return 'bg-danger';
      if (s === 'STOCKED') return 'bg-success';
      return 'bg-secondary'; // NOTSET
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 12px;
  overflow: hidden; /* ensures list bottom corners stay rounded */
}

.list-group-item {
  padding: 0.75rem 1rem;
}

.small {
  margin-top: 0.25rem;
}
</style>
