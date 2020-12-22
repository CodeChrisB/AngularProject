package repository;

import entity.Person;
import entity.Todo;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

/**
 *
 * @author Christopher Buchberger
 *
 * */
@ApplicationScoped
public class DBRepositoryTodo {

    // Entitymanager erzeugen
    @Inject
    private EntityManager em ;

    // Initialisieren
    //@PostConstruct
    public void initDB() {
        System.out.println("DB TODO INIT");
        this.deleteAll();
        this.create(new Todo("Chris","Add angular project",1,15));
        this.create(new Todo("Robert","Add Backend",1,15));
        this.create(new Todo("Elias","Just to something",1,15));
        this.create(new Todo("Egger","CP into CC",1,15));
        this.create(new Todo("Tobias","Idk?",1,15));
        this.create(new Todo("Marc","Scan Notes",1,15));
        this.create(new Todo("Markus","Idk",1,15));
        this.create(new Todo("Franz","Teach stuff",1,15));
        this.create(new Todo("Thomas","Teach stuff",1,15));
        this.create(new Todo("Sysadmin","Fix Computers",1,15));
        this.create(new Todo("Renate","Learn how to use a goddamn computer, if you cant work with it it's not my problem",1,15));
        this.create(new Todo("Obermüller","Add angular project",1,15));
        this.create(new Todo("Keck","USB Port != Lan Port",1,15));
        this.create(new Todo("Mama","Make cookies",1,15));
    }

    // Finden einer Todo über ID in der DB
    public Person find(long id) {
        return em.find(Person.class, id);
    }

    // Einfügen einer neuen Todo in die DB
    @Transactional
    public Todo create(Todo todo) {
        em.persist(todo);
        return todo;
    }

    // Löschen einer Todo
    @Transactional
    public long delete(long id){
        em.remove(this.find(id));
        return id;
    }

    // Löschen aller Todo
    @Transactional
    public void deleteAll(long id){
        this.findAll().forEach(person -> delete(person.getId()));
    }

    public List<Person> findAll(){
        return em.createQuery("SELECT t FROM Todo t").getResultList();
    }


    @Transactional
    public void update(Person person){
        em.merge(person);
    }
    @Transactional
    public void deleteAll(){
        List<Person> personList = em.createQuery("SELECT t FROM Todo t").getResultList();
        personList.forEach(i -> em.remove(i));
    }
}