package be.eafcuccle.projint.lounasnait.HopeFund;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin("http://localhost:5173")
public class MessageController {

    private static final Logger logger = LoggerFactory.getLogger(MessageController.class);

    @PostMapping("/logMyMessage")
    public ResponseEntity<?> logMessage(@RequestBody Message message) {
        String message1 = message.getMessage();

        logger.info("Message reçu : {}", message1);
        return ResponseEntity.noContent().build();

    }

}
