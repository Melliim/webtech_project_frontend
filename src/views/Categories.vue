<template>
    <h1><br>Your Categories</h1>
    <div class="container-fluid">
        <categories-card-list :categories="this.categories"></categories-card-list>
    </div>
    <categories-create-form></categories-create-form>
</template>

<script >
import CategoriesCardList from "@/components/CategoriesCardList.vue";
import CategoriesCreateForm from "@/components/CategoriesCreateForm.vue";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Categories',
    components: {
      CategoriesCardList,
        CategoriesCreateForm
    },
    data () {
      return {
          categories: []
      }
    },
    mounted() {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        }

        fetch('http://localhost:8080/api/v1/categories', requestOptions)
            .then(response => response.json())
            .then(result => result.forEach(category =>{
                this.categories.push(category)
            }))
            .catch(error => console.log('error', error))
    }
}
</script>

<style>

</style>
