package tisch.welchezukunft.org;

import org.springframework.data.repository.CrudRepository;

import tisch.welchezukunft.org.Image;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ImageRepository extends CrudRepository<Image, Long> {

}
