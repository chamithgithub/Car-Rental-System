package lk.easyCar.service;

import lk.easyCar.dto.CustomerDTO;

import java.util.List;


public interface CustomerService {

    void saveCustomer(CustomerDTO customerDTO);


    void deleteCustomer(String id);

    CustomerDTO getCustomerDetail(String id);

    CustomerDTO checkCustomerLogIn(String user_name, String password);

    List<CustomerDTO> getAllCustomerDetail();

    List<CustomerDTO> getTodayRegisteredCustomers();



}
