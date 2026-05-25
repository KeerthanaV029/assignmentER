package com.service;

import com.model.User;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class AuthService
{
    private final Session session;
    public AuthService(Session session)
    {
        this.session=session;
    }
    public User login(String user, String pass)
    {
        Transaction tx= session.beginTransaction();
        User user1 = session.createQuery("from User where username=:username and password=:password", User.class)
                .setParameter("username", user)
                .setParameter("password", pass)
                .getSingleResult();
        tx.commit();

        return user1;
    }
}
