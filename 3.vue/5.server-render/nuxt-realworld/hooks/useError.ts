function useError() {
    const errors = ref({})
    const setErrors = (error: any) => {
        if (error.value) {
            errors.value = error.value?.data.errors
            return true
        }
        return false
    }
    return {
        errors,
        setErrors,
    }
}

export default useError
