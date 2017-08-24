package tisch.welchezukunft.org;

import org.springframework.data.repository.CrudRepository;

import tisch.welchezukunft.org.Event;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface EventRepository extends CrudRepository<Event, Long> {

}
