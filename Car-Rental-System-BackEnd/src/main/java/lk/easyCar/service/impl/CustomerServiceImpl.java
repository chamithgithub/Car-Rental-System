package lk.easyCar.service.impl;

import lk.easyCar.dto.CustomerDTO;
import lk.easyCar.entity.Customer;
import lk.easyCar.repo.CustomerRepo;
import lk.easyCar.service.CustomerService;
import lk.easyCar.util.PasswordEncryptor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


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



    @Override
    public void deleteCustomer(String id) {
        if (customerRepo.existsById(id)) {
            customerRepo.deleteById(id);
        } else {
            throw new RuntimeException("Something Wrong,Cant Delete Your Details.Please Contact Admin");
        }
    }

    @Override
    public CustomerDTO getCustomerDetail(String id) {
        if (customerRepo.existsById(id)) {
            return mapper.map(customerRepo.findById(id).get(), CustomerDTO.class);
        } else {
            throw new RuntimeException("Something Wrong,Cant Get Your Details.Please Contact Admin");
        }
    }

    @Override
    public CustomerDTO checkCustomerLogIn(String user_name, String password) {
        Customer customer = customerRepo.checkCustomerLogIn(user_name, password);
        if (!(customer == null)) {
            return mapper.map(customer, CustomerDTO.class);
        } else {
            return null;
        }
    }

    @Override
    public List<CustomerDTO> getAllCustomerDetail() {
        return mapper.map(customerRepo.findAll(), new TypeToken<List<CustomerDTO>>() {
        }.getType());
    }

    @Override
    public List<CustomerDTO> getTodayRegisteredCustomers() {
        return mapper.map(customerRepo.getTodayRegisteredCustomers(), new TypeToken<List<CustomerDTO>>() {
        }.getType());
    }
}


