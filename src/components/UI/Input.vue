<template>
    <div style="position: relative; border-radius: 5px;">
        <input ref="passwordInput" :type="type" :placeholder="placeholder" class="input"
            :class="[variant && `input-${variant}`]" />
        <div class="input-img">
            <img :src="image" alt=""> 
        </div>
        <div v-if="type === 'password'" class="input-eye" @click="togglePasswordVisibility">
            <img :src="isPasswordVisible ? passwordEyeIconHide : passwordEyeIcon" alt="Toggle visibility">
        </div>
        <!-- <div v-else class="input-eye">
            <img :src="image" alt="Toggle visibility">
        </div> -->
    </div>
</template>
<script setup>
import { ref } from 'vue';
const props = defineProps({
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
}

.input-gray {
    background: rgba(255, 255, 255, 0.4);
    color: #fff;
}

.input-gray::placeholder {
    color: #ffffff;
}
</style>