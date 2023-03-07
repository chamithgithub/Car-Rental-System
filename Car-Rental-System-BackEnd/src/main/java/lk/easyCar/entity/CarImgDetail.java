package lk.easyCar.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Blob;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = "car_img_detail")
public class CarImgDetail {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int img_id;

        private String image_1;
        private String image_2;
        private String image_3;
        private String image_4;

//        private Blob image_1;
//        private Blob image_2;
//        private Blob image_3;
//        private Blob image_4;
    }
