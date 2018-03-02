import eventBus from 'src/event';

export const switchMusic = function (data) {
  eventBus.$emit('switchMusic', data);
};

