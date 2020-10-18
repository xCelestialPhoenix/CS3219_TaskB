<template>
    <div id="user">
        <p>username: {{ user.username }}</p>
        <p>First Name: {{ user.firstname }}</p>
        <p>Last Name: {{ user.lastname }}</p>
        <p>Mobile Number: {{ user.mobile }}</p>
        <hr>
    </div>
</template>

<script>
    export default {
        name: "User",
        props: ['user'],
    }

</script>

<style scoped>

#user {
    padding: 0% 5%;
}
</style>