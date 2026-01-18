<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn sticky-button" data-bs-toggle="modal" data-bs-target="#createModal">
        <!--        <strong class="text-white">+</strong>-->
        <i class="bi bi-plus-lg"></i>
    </button>

    <!-- Modal -->
    <div class="modal fade" id="createModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Add a new Category</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="needs-validation text-start" novalidate>
                        <div class="mb-3">
                            <label for="name" class="form-label-lg">Category</label>
                            <input type="text" class="form-control" id="name" v-model="name" >
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label-lg">Description</label>
                            <input type="text" class="form-control" id="description" v-model="description" >
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="activeStatus" v-model="activeStatus">
                            <label class="form-check-label" for="flexSwitchCheckDefault">Active</label>
                        </div>
                        <div class="mt-5">
                            <button class="btn btn-danger" type="reset" @click="resetForm">Reset</button>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary me-3" type="submit" @click="createCategory" data-bs-dismiss="modal">Create</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script >

export default {
    name: 'CategoriesCreateForm',
    data() {
        return {
            name: '',
            description: '',
            activeStatus: false
        }
    },
    methods: {
        resetForm() {
            this.name = '';
            this.description = '';
            this.activeStatus = false;
        },
        createCategory() {
            const endpoint = "http://localhost:8080/api/v1/categories"

            const headers = new Headers();
            headers.append("Content-Type", "application/json");

            const payload = JSON.stringify({
                name: this.name,
                description: this.description,
                activeStatus: this.activeStatus
            });

            const requestOptions = {
                method: 'POST',
                headers: headers,
                body: payload,
                redirect: 'follow'
            };

            fetch(endpoint, requestOptions)
                .then(response => {
                    if (response.ok) {
                        // Refresh the page to show the new category
                        window.location.reload();
                    } else {
                        console.log('Error:', response.status);
                    }
                })
                .catch(error => console.log('Error:', error));
        }
    },
}

</script>

<style scoped>
.sticky-button {
  position: fixed;
  right: 20px;
  top: 430px;
  padding: 15px 20px;
  border-radius: 30px;
  background-color: var(--accent);
  border: none;
  box-shadow: 0 10px 20px rgba(79,99,111,0.25);
}

.sticky-button:hover {
  filter: brightness(1.05);
}

.bi-plus-lg {
  color: white;
}

.modal-content {
  color: var(--text);
  background-color: #fff;
  border-radius: 14px;
}
</style>
