<template>
  <main class="theatre-app">
    <p>Select either of the available seats in the seating plan.</p>
    <section class="theatre">
      <div class="screen">
        <p>Screen is this way</p>
      </div>
      <seat-list :seats="seats" :selectedSeatIds="selectedSeatIds" 
        @selected="selectSeats"
      />
    </section>
    <seat-legend />
    <confirmation-modal v-if="seatsToConfirm.length"
      :seatsToConfirm="seatsToConfirm"
      @close="closeModal"
    />
  </main>
</template>

<script>
import seatService from '@/services/seat.service.js';
import seatList from '@/components/seat-list.vue';
import seatLegend from '@/components/seat-legend.vue';
import confirmationModal from '@/components/confirmation-modal.vue';

export default {
  name: 'theatreApp',
  data() {
    return {
      seats: [],
      selectedSeatIds: [],
      seatsToConfirm: [],
      timeout: null
    };
  },
  created() {
    this.seats = seatService.getSeats();
    window.addEventListener('storage', this.storageUpdateHandler);
  },
  destroyed() {
    window.removeEventListener('storage', this.storageUpdateHandler);
  },
  methods: {
    selectSeats(seats) {
      seats.forEach(seat => {
        seat.status = 'reserved';
      });
      seatService.setSeatsStatus(seats.map(seat => seat.id), 'reserved');
      this.seatsToConfirm = seats;
      this.timeout = setTimeout(this.closeModal, 10000, false);
    },
    closeModal(confirmation) {
      if (this.timeout) this.timeout = clearTimeout(this.timeout);
      if (confirmation) {
        this.selectedSeatIds = [...this.selectedSeatIds, ...this.seatsToConfirm.map(seat => seat.id)];
      } else {
        this.seatsToConfirm.forEach(seat => {
          seat.status = 'available';
        });
        seatService.setSeatsStatus(this.seatsToConfirm.map(seat => seat.id), 'available');
      }
      this.seatsToConfirm = [];
    },
    storageUpdateHandler(ev) {
      if (ev.key === 'theatre-seats') {
        this.seats = seatService.loadSeats();
      }
    }
  },
  components: {
    seatList,
    seatLegend,
    confirmationModal
  }
}
</script>
