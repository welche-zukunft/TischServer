package tisch.welchezukunft.org;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Image {
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
	
	String imageName;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss a z")
	Date timestamp;

	public Integer getId() {
		return id;
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

	public void setId(Integer id) {
		this.id = id;
	}


	
	
	
	

}
