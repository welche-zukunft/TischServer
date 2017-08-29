package tisch.welchezukunft.org;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity 
public class Event {
	
	
	enum Status {NEWEVENT, PLACED, PENDING, DELETED}
	
	
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    
    private String title;
    
    private String content;
    
    private String notes;
    
    private Integer year;
    
    private Integer workshopId;
    
    private String imageName;
    
    private Date timestamp;
    
    private boolean load;
    
    
    

	
    
    


	public Integer getId() {
		return id;
	}






	public void setId(Integer id) {
		this.id = id;
	}






	public String getTitle() {
		return title;
	}






	public void setTitle(String title) {
		this.title = title;
	}






	public String getContent() {
		return content;
	}






	public void setContent(String content) {
		this.content = content;
	}






	public Integer getYear() {
		return year;
	}






	public void setYear(Integer year) {
		this.year = year;
	}






	public Integer getWorkshopId() {
		return workshopId;
	}






	public void setWorkshopId(Integer workshopId) {
		this.workshopId = workshopId;
	}






	public String getImageName() {
		return imageName;
	}






	public void setImageName(String imageName) {
		this.imageName = imageName;
	}






	public Date getTimestamp() {
		return timestamp;
	}






	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

		


	public String getNotes() {
		return notes;
	}






	public void setNotes(String notes) {
		this.notes = notes;
	}






	public boolean isLoad() {
		return load;
	}






	public void setLoad(boolean load) {
		this.load = load;
	}






	@Override
    public boolean equals(Object o) {
        return this.id.equals(((Event)o).getId());
    }
    

    
	
    
}

