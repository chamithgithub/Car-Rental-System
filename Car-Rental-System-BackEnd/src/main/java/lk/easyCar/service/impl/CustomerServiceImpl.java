package lk.easyCar.service.impl;

import lk.easyCar.dto.CustomerDTO;
import lk.easyCar.entity.Customer;
import lk.easyCar.repo.CustomerRepo;
import lk.easyCar.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
@Transactional

public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
     ModelMapper mapper;

    @Override
    public void saveCustomer(CustomerDTO customerDTO) {
        if (customerRepo.existsById(customerDTO.getNic())) {
            throw new RuntimeException("Customer "+customerDTO.getNic()+" Already Exist..!");
        }
        customerRepo.save(mapper.map(customerDTO, Customer.class));
    }

}
