<script>


export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Navbar'
}
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">stockUp</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <router-link class="nav-link" to = "/">Home</router-link>
                    <router-link class="nav-link" to = "/about">About</router-link>
                    <router-link class="nav-link" to = "/categories">Categories</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>

</style>