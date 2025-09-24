<template>
    <div class="loader-spinner"></div>
</template>
<script setup>

</script>
<style scoped>
.loader-spinner {
    width: 20px;
    height: 20px;
    display: inline-block;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    margin-right: 5px;
    animation: spin 1s linear infinite;
}



@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>