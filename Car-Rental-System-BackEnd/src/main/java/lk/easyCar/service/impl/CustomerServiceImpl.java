package lk.easyCar.service.impl;

import lk.easyCar.dto.CustomerDTO;
import lk.easyCar.entity.Customer;
import lk.easyCar.repo.CustomerRepo;
import lk.easyCar.service.CustomerService;
import lk.easyCar.util.PasswordEncryptor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
@Transactional

public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
     ModelMapper mapper;

    @Autowired
    private PasswordEncryptor passwordEncoder;

    @Override
    public void saveCustomer(CustomerDTO customerDTO) {
        if (!customerRepo.existsById(customerDTO.getNic())) {
            String password = passwordEncoder.doHashing(customerDTO.getPassword());
            customerDTO.setPassword(password);
            customerRepo.save(mapper.map(customerDTO, Customer.class));
        } else {
            throw new RuntimeException(" Already .!");
        }
    }

}
