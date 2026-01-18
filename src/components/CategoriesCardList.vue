<template>
    <div class="py-5">
        <div class="container">
            <div class="row hidden-md-up">
                <div class="col-md-4" v-for="category in categories" :key="category.id" :class="{ 'active-card': category.activeStatus }">
                    <div class="card">
                        <div class="card-block">
                            <i v-if="category.activeStatus" class="fas fa-star status-icon-lg"></i>
                            <i v-else class="far fa-star status-icon-lg"></i>
                            <h4 class="card-title">{{ category.name }}</h4>
                            <p class="card-text p-y-1">zusätzliche Information: <br>{{ category.description}}</p>
                            <p class="card-text p-y-1">aktuelle Anzahl an Artikel: {{ category.items.length }}</p>
                            <router-link :to="`/items/${category.id}`" class="button-link">Items & Articles</router-link>
                            <span @click="deleteCategory(category.id)" class="delete-icon" title="Delete Category">
                <i class="bi bi-trash"></i>
              </span>
                            <button type="button" class="btn" @click="openModal(category)" data-bs-toggle="modal" data-bs-target="#editModal">
                                <i class="bi bi-pencil"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Update Category</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="needs-validation text-start" novalidate>
                        <div class="mb-3">
                            <label for="name" class="form-label-lg">Category</label>
                            <input type="text" class="form-control" id="name" v-model="editCategory.name">
                        </div>
                        <div class="mb-3">
                            <label for="description" class="form-label-lg">Description</label>
                            <input type="text" class="form-control" id="description" v-model="editCategory.description">
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="activeStatus" v-model="editCategory.activeStatus">
                            <label class="form-check-label" for="activeStatus">Active</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary me-3" type="submit" @click="updateCategory" data-bs-dismiss="modal">Update</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CategoriesCardList',
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            editCategory: {
                id: '',
                name: '',
                description: '',
                activeStatus: false
            }
        };
    },
    methods: {
        deleteCategory(categoryId) {
            const confirmed = confirm('Are you sure you want to delete this category?');
            if (confirmed) {
                const endpoint = `http://localhost:8080/api/v1/categories/${categoryId}`;

                const requestOptions = {
                    method: 'DELETE',
                    redirect: 'follow'
                };

                fetch(endpoint, requestOptions)
                    .then(response => {
                        if (response.ok) {
                            // Category deleted successfully, perform any necessary actions
                            window.location.reload();
                        } else {
                            console.log('Error:', response.status);
                        }
                    })
                    .catch(error => console.log('Error:', error));
            }
        },
        openModal(category) {
            this.editCategory = { ...category };
        },
        updateCategory() {
            const endpoint = `http://localhost:8080/api/v1/categories/${this.editCategory.id}`;

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.editCategory),
                redirect: 'follow'
            };

            fetch(endpoint, requestOptions)
                .then(response => {
                    if (response.ok) {
                        // Category updated successfully, perform any necessary actions
                        window.location.reload();
                    } else {
                        console.log('Error:', response.status);
                    }
                })
                .catch(error => console.log('Error:', error));
        }
    }
};
</script>

<style scoped>
.card {
    margin-bottom: 2rem; /* Add margin-bottom for spacing */
}

.card-block {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    background-color: #c9e8fd;
    color: #a36efa;
}

.card{
    transition: border-color 1s, box-shadow 0.5s;
}

.card:hover {
    border-color: rgba(13, 110, 253, 0.7);
    box-shadow: 0px 0px 14px 4px #b6608b;
}

.button-link {
    display: inline-block;
    padding: 5px 10px;
    background-color: skyblue;
    color: antiquewhite;
    text-decoration: none;
    border-radius: 3px;
    transition: background-color 0.3s ease;
}

.button-link:hover {
    background-color: deepskyblue;
}

.fas {
    margin-right: 5px;
}

.fa-star {
    color: darkorange;
}

.far{
    color: darkgoldenrod;
}

.status-icon-lg {
    position: absolute;
    top: 18px;
    left: 10px;
    font-size: 20px
}

.bi-trash {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    color: silver;
    cursor: pointer;
}

.modal-content {
    color: palevioletred;
    background-color: aliceblue;
}
</style>
