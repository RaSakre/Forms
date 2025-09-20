<template>
    <footer class="footer">
        <div class="container">
            <div class="footer__content">
                &#169; Все права защищены
                <a href="https://github.com/RaSakre" class="footer__link">Ранэль
                    <img src="../assets/Footer/github-icon.svg" alt="">
                </a>
            </div>
        </div>
    </footer>
</template>
<script setup>

</script>
<style scoped>
.footer {
    padding: 10px 0px;
}

.footer__content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.footer__content::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #ccc;
}

.footer__link {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
}

.footer__link img {
    width: 20px;
}
</style>