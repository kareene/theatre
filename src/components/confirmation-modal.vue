<template>
    <section class="confirmation-modal" @click="$emit('close', false)">
        <article class="modal" @click.stop="">
            <p>You have selected the following seat<span v-if="multipleSeats">s</span>:</p>
            <div class="selected-seats">
                <p class="seat-info" v-for="seat in seatsToConfirm" :key="seat.id">
                    {{seat.id}}
                    <span>{{price(seat.price)}}</span>
                </p>
            </div>
            <p v-if="multipleSeats" class="seat-info">Total: <span>{{total}}</span></p>
            <p>Please confirm your selection</p>
            <button @click.stop="$emit('close', true)" class="primary-button">
                Confirm
            </button>
            <button @click.stop="$emit('close', false)" class="secondary-button">
                Cancel
            </button>
        </article>
    </section>
</template>

<script>
export default {
    name: 'confirmation-modal',
    props: {
        seatsToConfirm: Array
    },
    created() {
        document.addEventListener('keyup', this.escapeKeyHandler);
    },
    destroyed() {
        document.removeEventListener('keyup', this.escapeKeyHandler);
    },
    computed: {
        multipleSeats() {
            return this.seatsToConfirm.length > 1;
        },
        total() {
            const total = this.seatsToConfirm.reduce((sum, seat) => sum + seat.price, 0);
            return this.price(total);
        }
    },
    methods: {
        price(seatPrice) {
            return seatPrice.toLocaleString('en-US', { style:'currency', currency:'USD' });
        },
        escapeKeyHandler(ev) {
            if (ev.keyCode === 27) {
                this.$emit('close', false);
            }
        }
    }
}
</script>