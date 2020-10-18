<template>
    <div id="navbar">
            <b-navbar toggleable="sm" type="dark" variant="dark">

            <b-navbar-brand>CS3219 Task B</b-navbar-brand>
            <b-collapse id="nav-text-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-text id="tab" @click="changeTab('get')">Get</b-nav-text>
                    <b-nav-text id="tab" @click="changeTab('post')">Post</b-nav-text>
                    <b-nav-text id="tab" @click="changeTab('update')">Update</b-nav-text>
                    <b-nav-text id="tab" @click="changeTab('delete')">Delete</b-nav-text>
                </b-navbar-nav>
            </b-collapse>
            </b-navbar>
            </div>
    </div>
</template>

<script>
    export default {
        name: "NavBar",

        data() {
            return {
                tab: 'get',
            }
        },

        methods: {
            changeTab (newTab) {
                this.tab = newTab;
                this.$emit('CustomEventInputChanged', this.tab);
            }
        }
    }   
</script>

<style scoped>

#tab {
    margin: 0px 20px;
    color: #FFFFFF;
    cursor: pointer;
}

#tab:hover {
    color: #c9c9c9;
}
</style>