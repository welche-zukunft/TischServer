package tisch.welchezukunft.org;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import tisch.welchezukunft.org.Event;
import tisch.welchezukunft.org.EventRepository;

@Controller  
@RequestMapping(path="/demo") 
public class MainController {
	
	@Autowired 	         
	private EventRepository userRepository;
	
	@GetMapping(path="/add")
	public @ResponseBody String addNewUser (@RequestParam String name
			, @RequestParam String email) {
	
		return "Saved";
	}
	
	@GetMapping(path="/all")
	public @ResponseBody Iterable<Event> getAllUsers() {
		
		return userRepository.findAll();
	}
}
