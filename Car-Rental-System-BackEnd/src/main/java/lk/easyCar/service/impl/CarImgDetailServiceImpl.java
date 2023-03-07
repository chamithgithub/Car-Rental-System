package lk.easyCar.service.impl;



import lk.easyCar.dto.CarImgDetailDTO;

import lk.easyCar.entity.CarImgDetail;
import lk.easyCar.repo.CarImgDetailRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CarImgDetailServiceImpl {
//
//    @Autowired
//    CarImgDetailRepo carImgDetailRepo;
//
//    @Autowired
//    ModelMapper mapper;
//
//    @Override
//    public void saveCar(CarImgDetailDTO carImgDetailDTO) {
//        if (!carImgDetailRepo.existsById(carImgDetailDTO.getImage_1())) {
//            carImgDetailRepo.save(mapper.map(carImgDetailDTO, CarImgDetail.class));
//        } else {
//            throw new RuntimeException("This Vehicle Already Registered To System..!");
//        }
//    }
//
}
