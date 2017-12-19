package app.entities;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
public class Point {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "point_Sequence")
    @SequenceGenerator(name = "point_Sequence", sequenceName = "ID_SEQ")
    private Long id;
    private float x;
    private float y;
    private float r;

    public Point() {
    }

    public Point(float x, float y, float r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public float getR() {
        return r;
    }

    public void setR(float r) {
        this.r = r;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
