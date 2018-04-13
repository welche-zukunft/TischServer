package tisch.welchezukunft.org.controller;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

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
	
	
	protected String getSaltString(int length) {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < length) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String saltStr = salt.toString();
        return saltStr;

    }
	
	@PostConstruct
	public void init() {
		pipe = new Pipeline();
		
		
		//   TEST DATA        TEST DATA        TEST DATA      //
		
		/*long offset = Timestamp.valueOf("2018-01-01 12:00:00").getTime();
		long end = Timestamp.valueOf("2018-01-01 12:10:00").getTime();
		long diff = end - offset + 1;
		
		for (int i = 0; i<4500; i++) {
			Sentence sentence = new Sentence();
			sentence.setContent(getSaltString(100));
			Timestamp rand = new Timestamp(offset + (long)(Math.random() * diff));			
			sentence.setTimestamp(rand);
			
			
			sentence.setWorkshopId( 1 + ((int) (Math.random() * 13)));
			sentence.setNumKeywords(5);
			
			sentenceRepository.save(sentence);
		}
		
		for (int i = 0; i<9000; i++) {
			Keyword keyword = new Keyword();
			keyword.setKeyword(getSaltString(15));
			keyword.setKeyindex(5);
			keyword.setSentence(sentenceRepository.findOne( (long) (Math.random() * 4499)));
			keywordRepository.save(keyword);
		}*/
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