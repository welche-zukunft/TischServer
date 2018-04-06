package tisch.welchezukunft.org.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

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
import tisch.welchezukunft.org.Pipeline;
import tisch.welchezukunft.org.Sentence;
import tisch.welchezukunft.org.controller.EventRestController.RestWrapperDTO;
import tisch.welchezukunft.org.SentenceRepository;
import tisch.welchezukunft.org.Image;
import tisch.welchezukunft.org.ImageRepository;
import tisch.welchezukunft.org.Keyword;
import tisch.welchezukunft.org.KeywordRepository;
import tisch.welchezukunft.org.storage.StorageFileNotFoundException;
import tisch.welchezukunft.org.storage.StorageService;


@RestController
public class ProtocollRestController {

	@Autowired
	SentenceRepository sentenceRepository;
	

	@Autowired
	KeywordRepository keywordRepository;

	Pipeline pipe;
	
	
	@PostConstruct
	public void init() {
		pipe = new Pipeline();
	}
	
	
	
	@PostMapping("/submitsentence")
	public RestWrapperDTO submitCurrentEvent(@RequestBody Sentence sentence) {
		System.out.println("##### Entered Sentence Submission Controller Method ####");
		
		LocalDateTime now = LocalDateTime.now();
		sentence.setTimestamp(java.sql.Timestamp.valueOf(now));
		
		List<Keyword> keywords = pipe.doSentenceTest(sentence.getContent());
		
		sentence.setNumKeywords(keywords.size());

		Sentence savedSentence = sentenceRepository.save(sentence);
				
		for (Keyword keyword : keywords) {
			keyword.setSentence(savedSentence);
			keywordRepository.save(keyword);
		}
		
		RestWrapperDTO wrapperDTO = new RestWrapperDTO();
		wrapperDTO.setSuccess(true);
		return wrapperDTO;

	}
	
	
	
	
	@ExceptionHandler(StorageFileNotFoundException.class)
	public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
		return ResponseEntity.notFound().build();
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