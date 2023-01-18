<template>
    <v-app-bar title="Order Book">
        <router-link class="mr-10 header__link" exact-path-active-class='router-link-exact-path-active' to="/">Glass Page</router-link>
        <router-link class="mr-10 header__link" to="/main">Status List</router-link>
    </v-app-bar>
</template>
<script setup>

</script>
<style lang="css">
    .header__link {
        color: black;
        text-decoration: none;
        transition: all ease 0.5s;
        border: 1px solid black;
        padding: 5px 10px;
    }
    .header__link:hover {
        transform: scale(1.1);
    }
    .router-link-active {  
        display: none;      
    }    
</style>
