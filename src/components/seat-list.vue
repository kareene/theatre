<template>
    <drag-select-container class="seat-list"
    selectorClass="available" :color="'rgb(255, 0, 0, 0.2)'"
    @change="dragSelectHandler" @mouseup.native="selectSeats">
        <single-seat v-for="(seat, i) in seats"
            :key="seat ? seat.id : 'noSeat' + i"
            :seat="seat" :isSelected="isSeatSelected(seat)"
            @selected="$emit('selected', $event)"
            :class="dragSelectActiveClass(seat)"
        />
    </drag-select-container>
</template>

<script>
import DragSelect from 'vue-drag-select/src/DragSelect.vue';
import singleSeat from '@/components/single-seat.vue';

export default {
    name: 'seatList',
    props: {
        seats: Array,
        selectedSeatIds: Array
    },
    data() {
        return {
            dragSelectedSeats: []
        }
    },
    methods: {
        isSeatSelected(seat) {
            return !!seat && !!this.selectedSeatIds.find(id => id === seat.id);
        },
        dragSelectActiveClass(seat) {
            const isActive = !!seat && !!this.dragSelectedSeats.find(currSeat => currSeat.id === seat.id)
            return isActive ? 'active' : '';
        },
        dragSelectHandler(seats) {
            this.dragSelectedSeats = seats.map(el => el._props.seat);
        },
        selectSeats() {
            if (!this.dragSelectedSeats.length) return;
            this.$emit('selected', this.dragSelectedSeats);
            this.dragSelectedSeats = [];
        }
    },
    components: {
        'drag-select-container': DragSelect,
        singleSeat
    }
}
</script>