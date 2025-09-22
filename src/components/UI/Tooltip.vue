<template>
    <div class="toggle-with-tooltip">
        <div class="toggle-wrapper" ref="triggerRef">
            <label class="modern-toggle">
                <input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', !modelValue)" />
                <span class="modern-slider">
                    <span class="toggle-knob"></span>
                </span>
            </label>
            <span class="status-text">{{ modelValue ? 'Активно' : 'Неактивно' }}</span>
        </div>

        <!-- Тултип -->
        <div v-if="showTooltip" ref="tooltipRef" class="tooltip" :style="tooltipStyles">
            Обязательное поле
            <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { createPopper } from '@popperjs/core'
import type { Instance, Options } from '@popperjs/core'

interface Props {
    modelValue: boolean
    tooltipText?: string
}

const props = withDefaults(defineProps<Props>(), {
    tooltipText: 'Обязательное поле'
})

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
}>()

// Refs для Popper.js
const triggerRef = ref<HTMLElement>()
const tooltipRef = ref<HTMLElement>()
const popperInstance = ref<Instance | null>(null)

// Состояние тултипа
const showTooltip = ref(false)
const tooltipStyles = ref({})

// Настройки Popper
const popperOptions: Partial<Options> = {
    placement: 'top',
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0, 8]
            }
        },
        {
            name: 'flip',
            options: {
                fallbackPlacements: ['bottom', 'left', 'right']
            }
        }
    ]
}

// Показать тултип
const showTooltipHandler = () => {
    showTooltip.value = true
    if (triggerRef.value && tooltipRef.value) {
        popperInstance.value = createPopper(triggerRef.value, tooltipRef.value, popperOptions)
    }
}

// Скрыть тултип
const hideTooltipHandler = () => {
    showTooltip.value = false
    if (popperInstance.value) {
        popperInstance.value.destroy()
        popperInstance.value = null
    }
}

// Автоматическое скрытие через 3 секунды (опционально)
const startAutoHide = () => {
    setTimeout(() => {
        hideTooltipHandler()
    }, 3000)
}

// Обработчики событий
const handleMouseEnter = () => {
    showTooltipHandler()
}

const handleMouseLeave = () => {
    hideTooltipHandler()
}

// Очистка при размонтировании
onUnmounted(() => {
    if (popperInstance.value) {
        popperInstance.value.destroy()
    }
})
</script>

<style scoped>
.toggle-with-tooltip {
    position: relative;
    display: inline-block;
}

.toggle-wrapper {
    cursor: pointer;
}

/* Стили тултипа */
.tooltip {
    background: #333;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-family: Arial, sans-serif;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    max-width: 200px;
    text-align: center;
}

.tooltip-arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
}

.tooltip-arrow::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
    transform: rotate(45deg);
}

.tooltip[data-popper-placement^='top'] .tooltip-arrow {
    bottom: -4px;
}

.tooltip[data-popper-placement^='bottom'] .tooltip-arrow {
    top: -4px;
}

.tooltip[data-popper-placement^='left'] .tooltip-arrow {
    right: -4px;
}

.tooltip[data-popper-placement^='right'] .tooltip-arrow {
    left: -4px;
}

/* Анимация появления тултипа */
.tooltip {
    animation: tooltipFadeIn 0.2s ease-out;
}

@keyframes tooltipFadeIn {
    from {
        opacity: 0;
        transform: translateY(-4px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>