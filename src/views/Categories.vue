<template>
<h1>Welcome to Categories</h1>
    <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col" v-for="category in categories" :key="category.id">
            <div class="card" :class="{ 'highlight-card': category.activeStatus }">
                <div class="card-body">
                    <h5 class="card-title">{{ category.name }}</h5>
                    <p class="card-text">
                        zusätzliche Information: {{ category.description}}
                        <br>aktuelle Anzahl an Artikel: {{ category.items.length }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
export default {
    // eslint-disable-next-line vue/multi-word-component-names
  name: 'Categories',
    data () {
      return {
          categories: [

/*              {
                  id: 1,
                  name: 'Bad',
                  description: 'Rossman oder DM',
                  activeStatus: true,
                  items: []
              },
              {
                  id: 2,
                  name: 'Garten',
                  description: 'Obi hat die beste Erde',
                  activeStatus: false,
                  items: [
                      1,
                      2
                  ]
              }*/
          ]
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
    .highlight-card {
        /* Apply your highlighting styles here */
        background-color: yellow;
    }
</style>
