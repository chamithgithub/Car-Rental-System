package lk.easyCar.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class CarImgDetailDTO {

    private int img_id;

    private String image_1;
    private String image_2;
    private String image_3;
    private String image_4;

}
