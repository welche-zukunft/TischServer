package tisch.welchezukunft.org.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import tisch.welchezukunft.org.Event;
import tisch.welchezukunft.org.EventRepository;
import tisch.welchezukunft.org.storage.StorageFileNotFoundException;
import tisch.welchezukunft.org.storage.StorageService;

@RestController
public class EventRestController {

	@Autowired
	EventRepository eventRepository;

    private final StorageService storageService;

    @Autowired
    public EventRestController(StorageService storageService) {
        this.storageService = storageService;
    }


    @PostMapping("/upload/")
    public @ResponseBody String handleFileUpload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) {
    	
    	System.out.println(file);
    	
    	
    	
    	

        storageService.store(file);
        redirectAttributes.addFlashAttribute("message",
                "You successfully uploaded " + file.getOriginalFilename() + "!");

        return "success";
    }

    
    @ExceptionHandler(StorageFileNotFoundException.class)
    public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
        return ResponseEntity.notFound().build();
    }
    
    
    
    
    @PostMapping("/sendevent")
    public @ResponseBody String sendEvent(@RequestBody Event event) {
    	
        eventRepository.save(event);

        return "success";
}
    
    
    
   
    

}