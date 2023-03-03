<script>
import File from './file.vue';

export default {
    components: {
        File
    },
    props: [
        'id',
        'title',
        'background'
    ]
}
</script>

<template>
    <!-- 
    <div class="folder" :style="{ backgroundColor: background }">
        {{ title }}
    </div>   
     -->
    <div class="folder">
        <div class="item">
            <span>{{ title }}</span>
        </div>

        <div class="item">
            <span>{{ background }}</span>
        </div>

        <div class="item">
            <button>
                <font-awesome-icon icon="fa-solid fa-check" class="icon" />
            </button>
            <button>
                <font-awesome-icon icon="fa-solid fa-trash" class="icon" />
            </button>
        </div>   
    </div>    
</template>

<style scoped>
    .folder {
        color: #fff;
        display: grid;
        margin-bottom: 1rem;
        grid-auto-columns: 1fr;
        grid-template-columns: repeat(4, 1fr);
    }
    .folder > .item:nth-child(1) { 
        grid-column: 1 / 3; 
    }
    .folder > .item:nth-child(2) { 
        display: flex;
        grid-column: 3 / 4; 
        align-items: center;
        justify-content: center;
    }
    .folder > .item:nth-child(3) {
        display: flex;
        grid-column: 4 / 5;
        justify-content: space-around;
    }

    @media (min-width: 62em) { 
        .folder {
            width: 45vw;
        }
    }
</style>