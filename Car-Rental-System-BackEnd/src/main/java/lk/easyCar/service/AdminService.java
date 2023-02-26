package lk.easyCar.service;

import lk.easyCar.dto.AdminDTO;


public interface AdminService {

    AdminDTO checkAdminLogIn(String id, String password);
}
