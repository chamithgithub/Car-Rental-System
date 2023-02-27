package lk.easyCar.config;

import lk.easyCar.entity.Admin;
import lk.easyCar.repo.AdminRepo;
import lk.easyCar.util.PasswordEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.env.Environment;

@Configuration
@Import(JPAConfig.class)
public class WebRootConfig {

}
