package tisch.welchezukunft.org;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity 
public class Event {
	
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    
    private String title;
    
    private String content;
    
    private Integer year;
    
    private Integer workshopId;
    
    private String imageUrl;

	
    
    
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




	public String getImageUrl() {
		return imageUrl;
	}




	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}




	@Override
    public boolean equals(Object o) {
        return this.id.equals(((Event)o).getId());
    }
    

    
    
}

