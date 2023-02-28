package lk.easyCar.service.impl;

import lk.easyCar.dto.CustomerDTO;
import lk.easyCar.dto.UserDTO;
import lk.easyCar.entity.CarReservation;
import lk.easyCar.entity.Customer;
import lk.easyCar.repo.CarReservationRepo;
import lk.easyCar.repo.CustomerRepo;
import lk.easyCar.service.CustomerService;
import lk.easyCar.util.PasswordEncryptor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    CarReservationRepo carReservationRepo;

    @Autowired
    ModelMapper mapper;

    @Autowired
    PasswordEncryptor passwordEncryptor;

    @Override
    public void saveCustomer(CustomerDTO customerDTO) {
        if (!customerRepo.existsById(customerDTO.getNic())) {
            String password = passwordEncryptor.doHashing(customerDTO.getPassword());
            customerDTO.setPassword(password);
            customerRepo.save(mapper.map(customerDTO, Customer.class));
        } else {
            throw new RuntimeException("Customer Already Registered..!");
        }
    }

    @Override
    public String updateCustomer(CustomerDTO customerDTO) {
        if (customerRepo.existsById(customerDTO.getNic())) {
            CarReservation carReservation = carReservationRepo.checkTodayCustomerInReservationOrNot(customerDTO.getNic());
            if (carReservation == null) {
                customerRepo.save(mapper.map(customerDTO, Customer.class));
                return "Update Details Successfully....";
            } else {
                Customer customer = customerRepo.findById(customerDTO.getNic()).get();
                customer.setMobile(customerDTO.getMobile());
                customerRepo.save(customer);
                return "In Our Privacy Policy Ruled,You can Update your Mobile Number Only Details till Reservation is End ";
            }
        } else {
            throw new RuntimeException("Something Wrong,Can not Update Your Details.Please Contact Admin");
        }
    }

    @Override
    public void changeCustomerUsernameAndPassword(UserDTO userDTO) {
        if (customerRepo.existsById(userDTO.getCustomer_id())) {
            Customer customer = customerRepo.findById(userDTO.getCustomer_id()).get();

            String password = passwordEncryptor.doHashing(userDTO.getPassword());
            System.out.println(password);
            customer.setPassword(password);
            customer.setUser_name(userDTO.getUser_name());
            customerRepo.save(customer);
        } else {
            throw new RuntimeException("Something Wrong,Can not Change Your Username & password.Please Contact Admin");
        }
    }


    @Override
    public void deleteCustomer(String id) {
        if (customerRepo.existsById(id)) {
            customerRepo.deleteById(id);
        } else {
            throw new RuntimeException("Something Wrong,Can not Delete Your Details.Please Contact Admin");
        }
    }

    @Override
    public CustomerDTO getCustomerDetail(String id) {
        if (customerRepo.existsById(id)) {
            return mapper.map(customerRepo.findById(id).get(), CustomerDTO.class);
        } else {
            throw new RuntimeException("Something Wrong,Can not Get Your Details.Please Contact Admin");
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
