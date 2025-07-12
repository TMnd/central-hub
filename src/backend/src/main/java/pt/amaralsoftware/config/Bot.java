package pt.amaralsoftware.config;

import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;
import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.Message;
import net.dv8tion.jda.api.entities.channel.middleman.MessageChannel;
import net.dv8tion.jda.api.events.message.MessageReceivedEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
import net.dv8tion.jda.api.utils.FileUpload;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.nio.charset.StandardCharsets;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@ApplicationScoped
public class Bot extends ListenerAdapter {

    private static final Logger log = LoggerFactory.getLogger(Bot.class);

    private static JDA jda;

    @ConfigProperty(name = "discord.bot.token")
    String token;

    @ConfigProperty(name = "discord.bot.user.id")
    String userId;

    /* void onStart(@Observes StartupEvent ev) throws Exception {
        log.info("Starting Bot...");

        jda = JDABuilder.createDefault(token)
                .addEventListeners(this)
                .build();

        log.info("Bot started successfully");
    }*/

    @Override
    public void onMessageReceived(MessageReceivedEvent event) {
        Message msg = event.getMessage();
        if (msg.getContentRaw().equals("!ping")) {
            MessageChannel channel = event.getChannel();
            channel.sendMessage("Pong!").queue();
        }
    }

    public void sendFile(String fileContent) {
        if (jda == null) {
            log.error("JDA not initialized.");
            return;
        }

        jda.retrieveUserById(userId).queue(user -> {
            user.openPrivateChannel().queue(privateChannel -> {
                byte[] data = fileContent.getBytes(StandardCharsets.UTF_8);
                String currentDate = ZonedDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
                String fileName = String.format("report-%s.csv", currentDate);
                privateChannel.sendFiles(FileUpload.fromData(data, fileName)).queue();
            }, error -> log.error("Error open private channel", error));
        }, error -> log.error("User not found.", error));
    }

    public void sendMessageToChannel(String message) {
        if (jda == null) {
            log.error("JDA not initialized.");
            return;
        }

        jda.retrieveUserById(userId).queue(user -> {
            user.openPrivateChannel().queue(privateChannel -> {
                privateChannel.sendMessage(message).queue();
            }, error -> log.error("Error open private channel", error));
        }, error -> log.error("User not found.", error));
    }

}