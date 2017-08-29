package tisch.welchezukunft.org.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import tisch.welchezukunft.org.Event;
import tisch.welchezukunft.org.LoadFlag;
import tisch.welchezukunft.org.EventRepository;
import tisch.welchezukunft.org.Image;
import tisch.welchezukunft.org.ImageRepository;
import tisch.welchezukunft.org.storage.StorageFileNotFoundException;
import tisch.welchezukunft.org.storage.StorageService;

@RestController
public class EventRestController {

	@Autowired
	EventRepository eventRepository;

	@Autowired
	ImageRepository imageRepository;

	private final StorageService storageService;

	@Autowired
	public EventRestController(StorageService storageService) {
		this.storageService = storageService;
	}

	@PostMapping("/upload/")
	public RestWrapperDTO handleFileUpload(@RequestParam("file") MultipartFile file,
			RedirectAttributes redirectAttributes) {
		System.out.println("##### Entered Upload Controller Method ####");

		storageService.store(file);

		Image uploadedImage = new Image();
		uploadedImage.setImageName(file.getOriginalFilename());

		LocalDateTime now = LocalDateTime.now();
		uploadedImage.setTimestamp(java.sql.Timestamp.valueOf(now));

		imageRepository.save(uploadedImage);

		System.out.println("File " + file.getOriginalFilename() + " was successfully uploaded!");

		RestWrapperDTO wrapperDTO = new RestWrapperDTO();
		wrapperDTO.setSuccess(true);
		return wrapperDTO;

	}

	@PostMapping("/getimages/")
	public List<Image> getImages() {
		System.out.println("##### Entered Image List Service Controller Method ####");

		List<Image> res = new ArrayList<Image>();

		for (Image image : imageRepository.findAll()) {
			res.add(image);
		}

		return res;
	}

	@ExceptionHandler(StorageFileNotFoundException.class)
	public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
		return ResponseEntity.notFound().build();
	}

	@PostMapping("/submitcurrentevent")
	public RestWrapperDTO submitCurrentEvent(@RequestBody Event event) {
		System.out.println("##### Entered Event Submission Controller Method ####");
		
		event.setLoadFlag(LoadFlag.LOAD);
		

		if (event.getId() == null) {
			LocalDateTime now = LocalDateTime.now();
			event.setTimestamp(java.sql.Timestamp.valueOf(now));
			int vertexId = (int) eventRepository.count() + 1;
			event.setVertexId(vertexId);
		}
		
		eventRepository.save(event);
		

		RestWrapperDTO wrapperDTO = new RestWrapperDTO();
		wrapperDTO.setSuccess(true);
		return wrapperDTO;

	}

	@PostMapping("/getevents")
	public List<Event> getEvents() {
		System.out.println("##### Entered Event List Service Controller Method ####");

		List<Event> res = new ArrayList<Event>();

		for (Event event : eventRepository.findAll()) {
			res.add(event);
		}

		return res;

	}

	public class RestWrapperDTO {
		protected boolean success;

		public boolean isSuccess() {
			return success;
		}

		public void setSuccess(boolean value) {
			success = value;
		}
	}

	public class RestErrorDTO extends RestWrapperDTO {
		private Map<String, String> errors;

		public Map<String, String> getErrors() {
			return errors;
		}

		public void setErrors(Map<String, String> value) {
			errors = value;
		}
	}

}