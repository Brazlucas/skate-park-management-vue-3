import SkatePark from '../entities/skate-park.entity';

class SkateParkPayloadAdapter {
  public formatPayload(data: SkatePark) {
    return {
      name: data.name,
      description: data.description,
      location_id: data.location.id,
    };
  }
}

export default new SkateParkPayloadAdapter();