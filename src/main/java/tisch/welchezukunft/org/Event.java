package tisch.welchezukunft.org;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity 
public class Event {
	
			
	
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    
	@Column(length = 60) 
    private String title;
    
	@Column(length = 4000) 
    private String content;
    
	@Column(length = 4000) 
    private String notes;
    
    private Integer year;
    
    private Integer workshopId;
    
    private String imageName;
    
    private Date timestamp;
    
	@Enumerated(EnumType.STRING)
    private Status status;

	@Enumerated(EnumType.STRING)
    private LoadFlag loadFlag;
	
	private Float xValue = (float) 0;
	
	private Float yValue = (float) 0;
	
	private Integer vertexId;
  

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




	public String getNotes() {
		return notes;
	}




	public void setNotes(String notes) {
		this.notes = notes;
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

	
	



	public Status getStatus() {
		return status;
	}




	public void setStatus(Status status) {
		this.status = status;
	}
	
	



	public LoadFlag getLoadFlag() {
		return loadFlag;
	}




	public void setLoadFlag(LoadFlag loadFlag) {
		this.loadFlag = loadFlag;
	}


	
	
	public Float getxValue() {
		return xValue;
	}




	public void setxValue(Float xValue) {
		this.xValue = xValue;
	}




	public Float getyValue() {
		return yValue;
	}




	public void setyValue(Float yValue) {
		this.yValue = yValue;
	}


	
	
	


	public Integer getVertexId() {
		return vertexId;
	}




	public void setVertexId(Integer vertexId) {
		this.vertexId = vertexId;
	}




	@Override
    public boolean equals(Object o) {
        return this.id.equals(((Event)o).getId());
    }
    

    
	
    
}

