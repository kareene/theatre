<template>
    <article class="single-seat" v-if="seat" @click.stop="$emit('selected', [seat])"
        :class="{ 'available': seat.status === 'available',
            'reserved': seat.status === 'reserved',
            'selected': isSelected }"
    ></article>
    <div v-else></div>
</template>

<script>
export default {
    name: 'singleSeat',
    props: {
        seat: Object,
        isSelected: Boolean
    }
}
</script>