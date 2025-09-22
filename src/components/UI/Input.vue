<template>
    <div style="position: relative; border-radius: 5px;">
        <input ref="passwordInput" :type="type" :placeholder="placeholder" class="input"
            :style="[image ? '' : 'padding: 10px']" :class="[variant && `input-${variant}`]" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" @blur="$emit('blur')" />
        <div class="input-img">
            <img :src="image" alt="">
        </div>
        <div v-if="type === 'password'" class="input-eye" @click="togglePasswordVisibility">
            <img :src="isPasswordVisible ? passwordEyeIconHide : passwordEyeIcon" alt="Toggle visibility">
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: '',
        required: false,
    },
    type: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    variant: {
        type: String,
        required: false,
        default: '',
    },
    image: {
        type: String,
        required: false,
    },
    // инпут поиска, картинка с лупой только в конце, передать пропс
});
const emit = defineEmits(['update:modelValue', 'blur'])
const passwordInput = ref(null)
import passwordEyeIcon from '../../assets/auth/passwordEyeShow.svg'
import passwordEyeIconHide from '../../assets/auth/passwordEyeClose.svg'

const isPasswordVisible = ref(false)

const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value
    if (passwordInput.value) {
        passwordInput.value.type = isPasswordVisible.value ? 'text' : 'password'
    }
}

</script>

<style scoped>
.input-img {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 20px;
}

.input-eye {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
}

.input {
    width: 100%;
    padding: 10px 40px;
    min-height: 30px;
    background-color: #fff;
    border-radius: 10px;
    transition: all 0.3s ease;
}

.input:hover {
    outline: 1px solid #ffffff;
}

input:focus {
    outline: 1px solid rgb(252, 114, 1) !important;
}

.input-gray {
    background: rgb(91 87 87 / 40%);
    color: #fff;
}

.input-gray::placeholder {
    color: rgba(243, 242, 242, 0.3);
}
</style>