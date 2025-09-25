<template>
    <transition name="popup">
        <div v-if="show" class="popup">
            <div class="popup-content">
                <div class="popup-icon">✓</div>
                <span class="popup-text">Форма сохранена</span>
            </div>
        </div>
    </transition>
</template>
<script setup lang="ts">
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    }
})
</script>
<style scoped>
.popup {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1000;
    background: white;
    border-radius: 12px;
    padding: 16px 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 200px;
}

.popup-content {
    display: flex;
    align-items: center;
    gap: 12px;
}

.popup-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #10b981;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 14px;
}

.popup-text {
    color: #1f2937;
    font-weight: 500;
    font-size: 14px;
}

/* Анимации появления/исчезания */
.popup-enter-active,
.popup-leave-active {
    transition: all 0.3s ease;
}

.popup-enter-from {
    opacity: 0;
    transform: translateX(100px);
}

.popup-enter-to {
    opacity: 1;
    transform: translateX(0);
}

.popup-leave-from {
    opacity: 1;
    transform: translateX(0);
}

.popup-leave-to {
    opacity: 0;
    transform: translateX(100px);
}
</style>