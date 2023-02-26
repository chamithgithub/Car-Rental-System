package lk.easyCar.adviser;

import lk.easyCar.util.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController

public class AppWideExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @org.springframework.web.bind.annotation.ExceptionHandler({Exception.class})
    public ResponseUtil exceptionHandler(Exception e) {
        return new ResponseUtil(500, e.getMessage(), null);
    }
}

