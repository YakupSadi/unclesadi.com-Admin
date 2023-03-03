<script setup>

</script>

<template>
    <div class="create_file">
        <div class="close_icon">
            <font-awesome-icon 
                icon="fa-solid fa-xmark"
                class="icon" 
                @click="$store.commit('createGlobal')"
            />
        </div>

        <form action="" method="post">
            <input type="text" placeholder="File Title" required>
            <input type="file" name="" id="" required>
            <input type="submit" value="Save">
        </form>
    </div>    
</template>

<style scoped>
    .create_file {
        width: 100%;
        height: 100vh;
        display: flex;
        padding: 0 2rem;
        position: absolute;
        flex-direction: column;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.337);
    }
    .create_file > .close_icon > .icon {
        float: right;
        color: #fff;
        cursor: pointer;
        font-size: 2rem;
        margin-bottom: 1rem;
        background-color: #181818;
    }
    .create_file > form {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .create_file > form > input {
        color: #fff;
        margin: 1rem 0;
        font-size: 1.2rem;
        padding: .5rem 1rem;
        border: 3px solid #fff;
        background-color: #181818;
    }
    input[type="submit"] {
        cursor: pointer;
    }
    .create_file > form > input:focus {
        outline: none;
    }
</style>